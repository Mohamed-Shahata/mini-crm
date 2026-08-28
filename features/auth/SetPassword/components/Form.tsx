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
    showConfirmPassword,
    setShowConfirmPassword,
  } = useController();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PasswordField
        label="Password*"
        fieldName="password"
        error={errors.password}
        register={register}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <div className="mt-3">
        <PasswordField
          label="Confirm Password*"
          fieldName="confirmPassword"
          error={errors.confirmPassword}
          register={register}
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
        />
      </div>

      <p className="text-sm text-[#8F8F8F] font-normal mt-3 mb-11">
        Password requirements : At least 8 characters , One uppercase letter
        ,One number, One special character
      </p>

      <Button
        title="Set Password"
        isLoading={isLoadingSetPassword}
        loadingTitle="Saving..."
      />
    </form>
  );
}
