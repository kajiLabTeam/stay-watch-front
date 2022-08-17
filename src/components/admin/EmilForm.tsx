import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ActionButton } from "../common/ActionButton";
export const EmailForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className="flex flex-col items-center">
      <TextInput
        placeholder="your@email.com"
        label="登録するメールアドレス"
        required
        className="my-2"
      />
      <ActionButton
        name="登録する"
        onClick={() => {
          console.log("登録する");
        }}
        disabled
      />
    </div>
  );
};
