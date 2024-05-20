import { useLoaderData, redirect } from 'react-router-dom';
import { disk, createSession } from '@/lib/server';
import FilePicker from '@/components/file-picker';

import type { FsObjectResultType } from '@/types';

// eslint-disable-next-line
export async function loader() {
  const { result } = await disk();
  return result;
}

// eslint-disable-next-line
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const dirname = formData.get('dirname') as string;
  const basename = formData.get('basename') as string;
  const { result } = await createSession({ dirname, basename });
  return redirect(`/sessions/${result.id}`);
}

export default function Open() {
  const { dirname, entries: initialEntries } = useLoaderData() as FsObjectResultType;

  return (
    <>
      <h1 className="text-2xl">Notebooks</h1>
      <FilePicker dirname={dirname} entries={initialEntries} cta="Open" />
    </>
  );
}
