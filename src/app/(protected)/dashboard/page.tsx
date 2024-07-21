import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { CopyIcon, MoveHorizontalIcon } from "lucide-react";
import { currentUser } from "~/server/user";
import PageLink from "./components/pagelink";

export default async function page() {
  const session = await currentUser();
  console.log(session);

  return (
    <div className="grid gap-4 p-2 md:p-4">
      <PageLink />
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>A list of your team members.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-muted-foreground">
                  Product Manager
                </div>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <MoveHorizontalIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Jane Doe</div>
                <div className="text-sm text-muted-foreground">Designer</div>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <MoveHorizontalIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">John Smith</div>
                <div className="text-sm text-muted-foreground">Developer</div>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <MoveHorizontalIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
