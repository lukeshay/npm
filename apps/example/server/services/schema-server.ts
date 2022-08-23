import * as yup from "yup";

const validate = async <T1, T2, T3, T4, T5>(
  // @ts-expect-error
  schema: yup.ObjectSchema<T1, T2, T3, T4>,
  payload: T5,
): Promise<yup.InferType<typeof schema>> => {
  return await schema.validate(payload);
};

export { validate };
