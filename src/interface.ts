export type TMovement = 'up' | 'down' | 'same'
export type TDirection = 'up' | 'down'

export interface IResponse<TPayload> {
  code: string
  message: string
  payload: TPayload
}
