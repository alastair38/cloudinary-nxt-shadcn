'use client';

import { updateTags } from './actions';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { useToast } from '@/components/ui/use-toast';
import { FolderPlus, Tags } from 'lucide-react';
import { useState } from 'react';
import { Toaster } from './ui/toaster';
import { spawn } from 'child_process';

export function SelectTags({
  allTags,
  tags,
  imageID,
}: {
  allTags: any;
  tags: any;
  imageID: string | number | readonly string[] | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [isChecked, setisChecked] = useState(
    new Array(allTags.length).fill(false)
  );

  const { toast } = useToast();

  const handleOnChange = (position: number) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );

    setisChecked(updatedCheckedState);
  };

  const [message, setMessage] = useState<string>('');

  async function onupdateTags(formData: FormData) {
    const res = await updateTags(formData);

    console.log(res);

    res.success
      ? toast({
          description: res.message,
        })
      : toast({
          variant: 'destructive',
          description: res.message,
        });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="absolute bottom-2 right-2"
          onClick={async () => {
            setOpen(true);
          }}
          asChild
        >
          <Button>
            <Tags className="mr-2 h-4 w-4" />
            <span>Edit tags</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {/* <DialogFooter>
        <Button
          onClick={async () => {
            onClose();
            setOpen(false);
            await addImageToAlbum(image, albumName);
          }}
          type="submit"
        >
          Update tag
        </Button>
      </DialogFooter> */}
          <form action={onupdateTags} className="space-y-8">
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag: any, index: any) =>
                tags.includes(tag) ? (
                  <span
                    key={`tag-${index}`}
                    className="flex items-center gap-2"
                  >
                    <Checkbox
                      checked={!isChecked[index]}
                      onCheckedChange={() => handleOnChange(index)}
                      name="tags"
                      id={`tag-${index}`}
                      value={tag}
                    />
                    <label htmlFor={`tag-${index}`}>{tag}</label>
                  </span>
                ) : (
                  <span
                    key={`tag-${index}`}
                    className="flex items-center gap-2"
                  >
                    <Checkbox name="tags" id={`tag-${index}`} value={tag} />
                    <label htmlFor={`tag-${index}`}>{tag}</label>
                  </span>
                )
              )}

              <input
                name="publicID"
                hidden
                readOnly
                type="text"
                value={imageID}
              />
            </div>

            <Button
              onClick={async () => {
                setOpen(false);
              }}
            >
              Submit
            </Button>
          </form>{' '}
        </DialogContent>
      </Dialog>

      <Toaster />
    </>
  );
}

// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';

// const formSchema = z.object({
//   tags: z
//     .array(z.string())
//     .refine(value => value.some(item => item))
//     .optional(),
// });

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// import { Checkbox } from '@/components/ui/checkbox';

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import {
//   JSXElementConstructor,
//   Key,
//   PromiseLikeOfReactNode,
//   ReactElement,
//   ReactNode,
//   ReactPortal,
//   useState,
// } from 'react';
// import { Button } from './ui/button';
// import { useForm } from 'react-hook-form';

// export function SelectTags(tags: any) {
//   const [tagNames, setTagName] = useState([]);

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(formSchema)
//   })

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values);
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="tags"
//           render={() => (
//             <FormItem>
//               <div className="mb-4">
//                 <FormLabel className="text-base">Sidebar</FormLabel>
//                 <FormDescription>
//                   Select the tags you want to display in the sidebar.
//                 </FormDescription>
//               </div>
//               {tags.tags.map(
//                 (
//                   item:
//                     | string
//                     | number
//                     | boolean
//                     | ReactElement<any, string | JSXElementConstructor<any>>
//                     | Iterable<ReactNode>
//                     | PromiseLikeOfReactNode
//                     | null
//                     | undefined,
//                   index: any
//                 ) => (
//                   <FormField
//                     key={`tag-${index}`}
//                     control={form.control}
//                     name="tags"
//                     render={({ field }) => {
//                       return (
//                         <FormItem
//                           key={`tag-${index}`}
//                           className="flex flex-row items-start space-x-3 space-y-0"
//                         >
//                           <FormControl>
//                             <Checkbox
//                               // onCheckedChange={checked => {
//                               //   return checked
//                               //     ? field.onChange([...field.value, item])
//                               //     : field.onChange(
//                               //         field.value?.filter(
//                               //           value => value !== item
//                               //         )
//                               //       );
//                               // }}
//                               value={item}
//                             />
//                           </FormControl>
//                           <FormLabel className="font-normal">{item}</FormLabel>
//                         </FormItem>
//                       );
//                     }}
//                   />
//                 )
//               )}
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//     // <Form {...form}>
//     //   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//     //     <FormField
//     //       control={form.control}
//     //       name="username"
//     //       render={({ field }) => (
//     //         <FormItem>
//     //           <FormLabel>Username</FormLabel>

//     //           {tags.tags.map((tag: any, index: any) => (
//     //             <FormControl
//     //               key={`tag-${index}`}
//     //               className="flex items-center gap-2"
//     //             >
//     //               <div>
//     //                 <Checkbox id={`tag-${index}`} value={tag} />
//     //                 <label htmlFor={`tag-${index}`}>{tag}</label>
//     //               </div>
//     //             </FormControl>
//     //           ))}

//     //           <FormDescription>
//     //             This is your public display name.
//     //           </FormDescription>
//     //           <FormMessage />
//     //         </FormItem>
//     //       )}
//     //     />
//     //     <Button type="submit">Submit</Button>
//     //   </form>
//     // </Form>
//     // <Dialog>
//     //   <DialogTrigger className="absolute top-2 right-2">
//     //     <span
//     //       className="px-3 py-2 shadow-lg rounded-md bg-slate-900"
//     //       role="button"
//     //     >
//     //       Manage tags
//     //     </span>
//     //   </DialogTrigger>
//     //   <DialogContent className="sm:max-w-[425px]">
//     //     <DialogHeader>
//     //       <DialogTitle>Tags</DialogTitle>
//     //       <DialogDescription>Update your tags</DialogDescription>
//     //     </DialogHeader>
//     //     <form onSubmit={handleSubmit} className="space-y-6">
//     //       <div className="flex flex-wrap gap-2">
//     //         {tags.tags.map((tag: any, index: any) => (
//     //           <span key={`tag-${index}`} className="flex items-center gap-2">
//     //             <Checkbox id={`tag-${index}`} value={tag} />
//     //             <label htmlFor={`tag-${index}`}>{tag}</label>
//     //           </span>
//     //         ))}
//     //       </div>
//     //       <button type="submit">Save</button>
//     //     </form>
//     //   </DialogContent>
//     // </Dialog>
//   );
// }
