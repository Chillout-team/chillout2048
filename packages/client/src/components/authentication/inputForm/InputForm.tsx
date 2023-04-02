import cls from "./InputForm.module.scss";
import { Input, InputInterface } from "../../common/input/Input";
import { Field } from "formik";

export const InputForm = (props: InputInterface) => {
    return (
        <Field
            {...props}
            containerClassName={cls.input_container}
            inputClassName={cls.input}
            labelClassName={cls.placeholder}
            errorClassName={cls.__error}
            component={Input}
        />
    );
};
