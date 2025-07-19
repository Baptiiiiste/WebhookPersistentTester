export type ReturnFormAction<T = undefined> =
  | { error: string; message: string }
  | T
export type FormActionCallback<TInputData, TOutputData = undefined> = (
  values: TInputData,
) => Promise<ReturnFormAction<TOutputData>>

export type ReturnFormDataAction<TOutputData> =
  | { ok: false; error: string; message: string }
  | { ok: true; data: TOutputData }
