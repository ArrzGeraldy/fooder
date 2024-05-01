import useAuth from "@/hooks/useAuth";

const Profile = () => {
  const { auth } = useAuth();
  return (
    <div className="w-full px-4 py-6 bg- rounded-lg drop-shadow-md bg-white">
      Welcome {auth?.user.username}
    </div>
  );
};

export default Profile;
