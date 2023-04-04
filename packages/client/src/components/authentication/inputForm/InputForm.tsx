import cls from "./InputForm.module.scss";
import { Input, InputInterface } from "../../common/input/Input";

export const InputForm = (props: InputInterface) => {
    return (
        <Input
            containerClassName={cls.input_container}
            inputClassName={cls.input}
            labelClassName={cls.placeholder}
            errorClassName={cls.__error}
            {...props}
        />
    );
};
