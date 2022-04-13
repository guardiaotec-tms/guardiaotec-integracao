import React, { useState, FunctionComponent, useEffect } from 'react';
import { Dialog, Box, Button, Card } from '@mui/material';
import { getFileDownloadUrl } from '../../../infra/services/getFileDownloadUrl';

type Props = {
  documentFileData: {
    filename: string;
    filenameInStorage: string;
  };
  alt: string;
};

export const DocumentButtonDialog: FunctionComponent<Props> = ({
  documentFileData,
  alt,
}) => {
  const [open, setOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  const { filenameInStorage, filename } = documentFileData;

  useEffect(() => {
    const func = async () => {
      const downloadUrl = await getFileDownloadUrl(filenameInStorage);
      setDownloadUrl(downloadUrl);
    };
    func();
  }, [filenameInStorage]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='text' color='primary' onClick={handleClick}>
        {filename.substring(0, 10)}
        {filename.length >= 10 && '...'}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <img width='300' height='300' src={downloadUrl} alt={alt}></img>
      </Dialog>
    </div>
  );
};
