import type * as yup from "yup";

export const validate = async <T1, T2, T3, T4, T5>(
  // @ts-expect-error - cant import shi
  schema: yup.ObjectSchema<T1, T2, T3, T4>,
  payload: T5,
): Promise<yup.InferType<typeof schema>> => schema.validate(payload);
