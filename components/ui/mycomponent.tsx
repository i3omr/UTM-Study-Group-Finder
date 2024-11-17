import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Mycomponent(props: any) {
  return (
    <div className="flex justify-center items-center ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{props.text1}</CardTitle>
          <CardDescription>{props.text2}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>{props.usercount}</div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}
