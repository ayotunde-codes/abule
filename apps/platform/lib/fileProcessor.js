import { FetchRequest } from '@abule-common/components';
/**
   * @return {{
    *   type: string{"dlsk"};
    *   files: string[];
    * }} data
   */
export default async (type, files, data) => {
  try {
    const { signature, params } = await FetchRequest({
      url: `${process.env.REACT_APP_API}/utils/get-file-processor-params?type=message-media`,
    });

    console.log('all done man', { signature, params });
    const form = new FormData();
    form.append('signature', signature);
    form.append('params', params);
    files.forEach((file) => {
      form.append('file', file);
    });
    const assembly = await FetchRequest({
      url: `${process.env.TRANSLOADIT_API}/assemblies`,
      method: 'POST',
      body: JSON.stringify({

      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('our assembly is ', assembly);
  } catch (e) {
    return e;
  }
};
