export type ReturnFormAction<T = undefined> =
  | { error: string; message: string }
  | T
export type FormActionCallback<TInputData, TOutputData = undefined> = (
  values: TInputData,
) => Promise<ReturnFormAction<TOutputData>>
