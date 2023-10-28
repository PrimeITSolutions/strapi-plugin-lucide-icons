import { useRBAC } from "@strapi/helper-plugin";

const perms = {
  read: [{ action: "plugin::lucide-icons.read", subject: null }],
};

function usePermissions() {
  const { isLoading: loading, ...allowedActions } = useRBAC(perms);
  return { ...allowedActions, loading };
}

export default usePermissions;
