import { ApiError } from '../../context/User';

export default function ErrorNotice({ error }: Props) {
  return (
    <div className="bg-red-200 p-2 m-2 my-4 border-2 rounded border-red-400">
      <p className="font-semibold text-lg text-center">{error.message}</p>
      {error.errorDetails && (
        <ul className="mt-1 ms-2">
          {error.errorDetails.map(el => (
            <li className="list-disc list-inside" key={el}>
              {el}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface Props {
  error: ApiError;
}
