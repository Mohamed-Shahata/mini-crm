import useController from "../hooks/useController";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import RememberMeAndForgetPassword from "./RememberMeAndForgetPassword";
import Button from "@/components/Button";

export default function From() {
  const {
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    onSubmit,
    isLoadingLogin,
  } = useController();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailInput register={register} error={errors.email} />

      <PasswordInput
        error={errors.password}
        register={register}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <RememberMeAndForgetPassword />

      <Button
        title="Login"
        isLoading={isLoadingLogin}
        loadingTitle="Logging in..."
      />
    </form>
  );
}
