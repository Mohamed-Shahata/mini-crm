export default function Button({
  title,
  isLoading = false,
  loadingTitle,
}: {
  title: string;
  isLoading?: boolean;
  loadingTitle?: string;
}) {
  return (
    <button
      disabled={isLoading}
      className="py-4 px-8 bg-primary text-white w-full rounded-sm text-lg font-medium"
    >
      {isLoading ? loadingTitle : title}
    </button>
  );
}
