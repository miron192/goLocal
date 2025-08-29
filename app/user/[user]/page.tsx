import { getPostsByUser } from "@/app/actions/getPostByUser";
import { getUserByClerkId } from "@/app/actions/getUserByClerkId";
import { getUserData } from "@/app/actions/getUserData";
import Post from "@/components/Post";
import Image from "next/image";

const page = async (props: { params: Promise<{ user: string }> }) => {
  const params: { user: string } = await props.params;
  const user = await getUserData(params.user);
  const posts = await getPostsByUser(params.user);
  const currentUser = await getUserByClerkId();

  if (!user) {
    return (
      <main>
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white/30 backdrop-blur-md border-2 border-gray-200/50 rounded-3xl shadow-md">
          <h1 className="text-3xl font-extrabold text-gray-800">
            User not found
          </h1>
          <p className="text-gray-600 text-sm">
            The requested user does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white/30 backdrop-blur-md border-2 border-gray-200/50 rounded-3xl shadow-md">
        <div className="flex items-center gap-6">
          <Image
            src={user.imageUrl || "/default-avatar.png"}
            alt={user.name ?? "User"}
            className="w-24 h-24 rounded-full shadow-md object-cover border-2 border-white"
            width={96}
            height={96}
          />
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              {user.name ?? "No Name"}
            </h1>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>
        <div className="mt-6 space-y-3 text-gray-700">
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>{" "}
      </div>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white/30 backdrop-blur-md border-2 border-gray-200/50 rounded-3xl shadow-md ">
        <h1 className="text-3xl font-extrabold mb-4 text-gray-800">
          {user.name}'<s></s> Posts:
        </h1>
        {posts?.map((post) => (
          <Post key={post.id} {...post} isOwner={currentUser?.id === user.id} />
        ))}
      </div>
    </div>
  );
};

export default page;
