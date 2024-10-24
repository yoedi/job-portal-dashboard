"use client";

import TitleForm from "@/components/atoms/TitleForm";
import CKEditor from "@/components/organisms/CKEditor";
import CustomUpload from "@/components/organisms/CustomUpload";
import FieldInput from "@/components/organisms/FieldInput";
import InputSkills from "@/components/organisms/InputSkills";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { EMPLOYEE_OPTIONS, LOCATION_OPTIONS, optionType } from "@/constants";
import { overviewFormSchema } from "@/lib/form-schema";
import { supabaseUploadFile } from "@/lib/supabase";
import { cn, fetcher } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanyOverview, Industry } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

interface OverviewFormProps {
  detail: CompanyOverview | undefined;
}

const OverviewForm: FC<OverviewFormProps> = ({ detail }) => {
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);
  const { data } = useSWR<Industry[]>("/api/company/industry", fetcher);
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof overviewFormSchema>>({
    resolver: zodResolver(overviewFormSchema),
    defaultValues: {
      dateFounded: detail?.dateFounded,
      description: detail?.description,
      employee: detail?.employee,
      image: detail?.image,
      industry: detail?.industry,
      location: detail?.location,
      name: detail?.name,
      techStack: detail?.techStack,
      website: detail?.website,
    },
  });

  const onSubmit = async (val: z.infer<typeof overviewFormSchema>) => {
    try {
      let filename = "";

      if (typeof val.image === "object") {
        const uploadImg = await supabaseUploadFile(val.image, "company");
        filename = uploadImg.fileName;
      } else {
        filename = val.image;
      }

      const body = {
        ...val,
        image: filename,
        companyId: session?.user.id,
      };

      await fetch("/api/company/overview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      toast({ title: "Success", description: "Edit profile success" });

      router.refresh();
    } catch (error) {
      toast({ title: "Error", description: "Please try again" });

      console.log(error);
    }
  };

  useEffect(() => setEditorLoaded(true), []);

  return (
    <div>
      <div className="my-5">
        <TitleForm
          title="Basic Information"
          subTitle="This is company information that you can update anytime"
        />
      </div>

      <Separator className="mb-7" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <FieldInput
            title="Company Logo"
            subTitle="This image will be shown publicy as company logo."
          >
            <CustomUpload form={form} name="image" />
          </FieldInput>

          <FieldInput
            title="Company Details"
            subTitle="Introduce your company core info quickly to users by fill up company details."
          >
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Twitter"
                        {...field}
                        className="w-[450px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://twitter.com"
                        {...field}
                        className="w-[450px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[450px]">
                          <SelectValue placeholder="Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LOCATION_OPTIONS.map((item: optionType, i: number) => (
                          <SelectItem key={item.id + i} value={item.id}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-[450px] grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="employee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Employee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EMPLOYEE_OPTIONS.map(
                            (item: optionType, i: number) => (
                              <SelectItem key={item.id + i} value={item.id}>
                                {item.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data?.map((item: Industry) => (
                            <SelectItem key={item.id} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="dateFounded"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Founded</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[450px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <InputSkills
                form={form}
                name="techStack"
                label="Add Tech Stack"
              />
            </div>
          </FieldInput>
          <FieldInput
            title="About Company"
            subTitle="Brief description for your company. URL are hyperlinked."
          >
            <CKEditor
              form={form}
              name="description"
              editorLoaded={editorLoaded}
            />
          </FieldInput>

          <div className="flex justify-end">
            <Button size="lg">Save Changes</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OverviewForm;
