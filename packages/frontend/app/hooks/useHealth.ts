import { useHealthControllerAuthCheck } from '../gen/endpoints/health/health'

export const useHealth = () => {
  const { data, error } = useHealthControllerAuthCheck({
    fetch: {
      headers: {
        Authorization: 'Bearer ey.......',
      },
    },
  })

  return {
    data,
    error,
  }
}
