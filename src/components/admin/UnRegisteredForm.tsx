import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSelectUsers } from "@/components/admin/selectUsersHook";
import { Button } from "@/components/common/Button";

export const UnRegisteredForm = () => {
  const selectUsers = useSelectUsers();
  const form = useForm({
    initialValues: {
      email: "",
      userName: "",
      termsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@gmail\S+$/.test(value) ? null : "Invalid email"),
      userName: (value) => (value ? null : "Invalid user"),
    },
  });
  return (
    <form
      className=" flex flex-col gap-6 p-10"
      onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <TextInput
        placeholder="your@gmail.com"
        label="登録するGmailアドレス"
        required
        {...form.getInputProps("email")}
      />
      <TextInput
        placeholder="your name"
        label="登録するユーザネーム"
        required
        {...form.getInputProps("userName")}
      />
      <div>
        <Button>登録する</Button>
      </div>
    </form>
  );
};
