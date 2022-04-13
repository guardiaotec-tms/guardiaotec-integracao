import React, { FunctionComponent, useEffect, useRef } from 'react';
import { FormControl, Input, InputLabel, Button } from '@mui/material';
import { uploadFileToStorage } from '../../../infra/services/uploadFile';
import { Box } from '@mui/system';

type Props = {
  //   handleSaveRef: React.MutableRefObject<File | undefined>;
  handleSaveRef: any;
  uploadLabel?: string;
  folderName?: string;
};

export const FileUploader: FunctionComponent<Props> = ({
  handleSaveRef,
  uploadLabel,
  folderName,
}) => {
  const fileRef = useRef<File>();

  useEffect(() => {
    handleSaveRef.current = handleSave;
  }, []);

  const onFileChange = (event: any) => {
    const file = event.target.files[0];
    fileRef.current = file;
    console.log(fileRef.current);
  };

  const handleSave = async () => {
    if (!fileRef.current)
      return console.log('Nenhum arquivo para ser armazenado');
    const result = await uploadFileToStorage(fileRef.current, folderName);
    return result;
  };

  return (
    <>
      <Box sx={{ border: '1px solid #ccc', padding: 1, borderRadius: '5px' }}>
        {uploadLabel}
        <FormControl sx={{}} fullWidth>
          <Input type='file' onChange={onFileChange} fullWidth />
        </FormControl>
      </Box>
    </>
  );
};
