import { type NextPage } from "next";

type Props = {
  children?: JSX.Element[] | JSX.Element;
};

const Index: NextPage<Props> = (props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-64 cursor-pointer items-center justify-start rounded bg-[#4285f4] py-3 px-4 text-sm font-bold text-gray-100 shadow hover:text-white">
        <svg
          viewBox="0 0 24 24"
          className="mr-3 h-5 w-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
        </svg>
        <span className="block h-6 w-1 border-l border-blue-500"></span>
        <span className="pl-3">Sign up with Google</span>
      </div>
      <div>{props.children != null ? props.children : null}</div>
    </div>
  );
};

export default Index;
