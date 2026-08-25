import useController from "../hooks/useController";
import PasswordField from "./PasswordField";
import Button from "@/components/Button";

export default function Form() {
  const {
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    onSubmit,
    isLoadingSetPassword,
  } = useController();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordField
        label="Password"
        fieldName="password"
        error={errors.password}
        register={register}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <PasswordField
        label="Confirm Password"
        fieldName="confirmPassword"
        error={errors.confirmPassword}
        register={register}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <Button
        title="Set Password"
        isLoading={isLoadingSetPassword}
        loadingTitle="Saving..."
      />
    </form>
  );
}
