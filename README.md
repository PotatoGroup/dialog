# @astii/dialog

[![NPM version](https://img.shields.io/npm/v/@astii/dialog.svg?style=flat)](https://npmjs.org/package/@astii/dialog)
[![NPM downloads](http://img.shields.io/npm/dm/@astii/dialog.svg?style=flat)](https://npmjs.org/package/@astii/dialog)

## Install

```bash
$ yarn add @astii/dialog
```

## Usage

```jsx
import React, { useState } from "react";
import Dialog from "@astii/dialog";
export default () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <Dialog
      title="dialog"
      width={500}
      open={open}
      draggable={true}
      inside={true}
      onClose={() => setOpen(false)}
    >
      <h1>dialog</h1>
    </Dialog>
  );
};
```

## Options

```ts
interface DialogProps {
  title?: React.ReactNode | string;
  /**
   * @default 1024
   */
  width?: CalStyle;
  open?: boolean;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  /**
   * dialog can be drag with handler
   * @default false
   */
  draggable?: boolean;
  /**
   * dialog can be drag within area
   * @default false
   */
  inside?: boolean;
  /**
   * close when click mask
   */
  maskClosable?: boolean;
  contentClassName?: string;
  closeIcon?: React.ReactNode;
  onClose?: () => void;
}
```

## LICENSE

ISC
