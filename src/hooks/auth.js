import useSWR from 'swr'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../lib/axios';
import { setCookie } from '../utils/cookie';

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useNavigate();
    const params = useParams();

    // swr로 요청을 보낸 후, 데이터를 받아온다.
    // data는 성공시, error은 실패시 받아오고, data의 이름을 user로 바꾼다.
    // useSWR에 첫번째 파라미터는 주소로 그 자체가 키가 된다.
    // useSWR은 두번째 파라미터로 오는 함수를 사용해서 요청을 보낸다. 이를 로컬 어딘가에 저장한다. 
    // revalidate 요청이 없다면, 계속 로컬에 저장된 데이터를 가져온다. 이를 캐싱된 상태라고 한다.
    // revalidate는 특정 useSWR의 두번째 파라미터에 오는 함수를 호출해서 로컬에 저장되어있는 값을 바꾼다는 의미
    // 이를 캐시를 갱신한다고 한다.
    // mutate는 함수다. 언제 데이터를 revalidate 할지 컨트롤 할 수 있다.
    // mutate 함수에는 파라미터로 useSWR의 키를 주어야 하지만, 어떤 useSWR의 반환값으로 나온 mutate는 key가 이미 바인딩 되어있어서, key를 넘기지 않아도 된다.
    const { data: user, error, mutate, isLoading } = useSWR('http://localhost:8000/api/user', () =>
        axios
            .get('http://localhost:8000/api/user')
            .then(res => res.data)
            .catch(error => {
                // 만약 에러가 발생했을때, 409번 에러라면 빨간 화면을 띄우고 아니면 그냥 홈으로 돌려보낸다.                
                if (error.response.status !== 409) throw error
                // 새로고침이 필요해서 navigate 말고 얘를 썼다.
                window.location.href = '/'
                
            }),
    )

    const csrf = () => {
        // csrf 토큰을 받아서 쿠키에 저장해둔다. 
      const response = axios.get('http://localhost:8000/sanctum/csrf-cookie')
      setCookie('csrfToken', response, {
        httpOnly:true, secure:true
      })
    }

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('http://localhost:8000/register', props)
            // 사용자 정보가 변경된 후 즉시 ui 갱신
            // mutate는 useState 처럼 DOM이 업데이트 된다.
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('http://localhost:8000/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }
    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('http://localhost:8000/forgot-password', { email })
            .then(response => {
                console.log('forgotPassword', response)
                setStatus(response.data.status)})
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('http://localhost:8000/reset-password', { token: params.token, ...props })
            .then(response => {
                window.location.href = '/login'
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('http://localhost:8000/email/verification-notification')
            .then(response => {
                console.log('resendEmailVerification', response)
                setStatus(response.data.status)
            })
    }

    const logout = async () => {
        if (!error) {
            await axios.post('http://localhost:8000/logout').then(() => mutate())
        }

        window.location.href = '/'
    }

    useEffect(() => {
        // middleware 가 guest 라는 건 현재 사용자가 인증이 되지 않은 사람이라는 의미
        // 하지만 user가 null이 아니라면 인증이 되어있다는 뜻이므로, 모순이 생긴다. 
        // (이미 로그인 되었는데 로그인 페이지로 넘어왔다거나)
        // 그럴때 redirectIfAuthenticated 로 바로 보낸다.
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router(redirectIfAuthenticated)
        // middleware 가 auth라는건 사용자가 인증되었다는 의미, 하지만 error가 null이 아니라는 건
        // 로그인 된 사용자를 받아올수 없다는 의미이다. 그래서 로그아웃을 해버려서 오류를 없앤다.
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        isLoading,
    }
}