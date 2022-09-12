import { Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSelectUsers } from "@/components/admin/selectUsersHook";
import { Button } from "@/components/common/Button";
export const RegisteredForm = () => {
  const selectUsers = useSelectUsers();
  const form = useForm({
    initialValues: {
      email: "",
      userID: "",
      termsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@gmail\S+$/.test(value) ? null : "Invalid email"),
      userID: (value) => (value ? null : "Invalid user"),
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
      <Select
        classNames={{
          label: "md:text-md",
          input: "w-full",
        }}
        label="ユーザ選択"
        placeholder="ユーザを選択"
        searchable
        nothingFound="No options"
        data={selectUsers}
        {...form.getInputProps("userID")}
      />
      <Button>登録する</Button>
    </form>
  );
};
