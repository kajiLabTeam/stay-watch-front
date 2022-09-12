import { Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSelectUsers } from "@/components/admin/selectUsersHook";
import { Button } from "@/components/common/Button";
import { useUserRole } from "@/utils/Auth";

export const BLERegisteredForm = () => {
  const selectUsers = useSelectUsers();
  const userRole = useUserRole();

  const form = useForm({
    initialValues: {
      targetID: "",
      targetEmail: "",
      taretName: "",
      targetRole: 1,
      userRole: userRole,
    },
    validate: {
      targetEmail: (value) =>
        /^\S+@gmail\S+$/.test(value) ? null : "Invalid email",
      targetID: (value) => (value ? null : "Invalid user"),
      targetRole: (value) => (value ? null : "Invalid user"),
    },
  });

  if (userRole == null) {
    return <div />;
  }

  return (
    <form
      className=" flex flex-col gap-6 p-10"
      onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <TextInput
        placeholder="your@gmail.com"
        label="Gmailアドレス"
        required
        {...form.getInputProps("targetEmail")}
      />
      <Select
        classNames={{
          label: "md:text-md",
          input: "w-full",
        }}
        label="ユーザ選択"
        required
        placeholder="ユーザを選択"
        searchable
        nothingFound="No options"
        data={selectUsers}
        {...form.getInputProps("targetID")}
      />
      <Select
        classNames={{
          label: "md:text-md",
          input: "w-full",
        }}
        label="ユーザロール"
        placeholder="ユーザロール"
        required
        searchable
        nothingFound="No options"
        data={[
          { label: "一般ユーザ", value: userRole - 1 },
          {
            label: "研究室管理者",
            value: userRole,
          },
        ]}
        {...form.getInputProps("targetRole")}
      />
      <div className=" mx-auto bg-red-300">
        <Button>登録する</Button>
      </div>
    </form>
  );
};
