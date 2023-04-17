import cls from "./InputForm.module.scss";
import { Input, IInput } from "@/components/common/input/Input";
import { Field } from "formik";

export const InputForm = (props: IInput) => {
    return (
        <Field
            {...props}
            containerClassName={cls.input_container}
            inputClassName={cls.input}
            labelClassName={cls.placeholder}
            errorClassName={cls.error_label}
            component={Input}
        />
    );
};
