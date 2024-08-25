import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Overview from "@/components/form/OverviewForm";
import SocialMediaForm from "@/components/form/SocialMediaForm";
import TeamForm from "@/components/form/TeamForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";
import { FC } from "react";
import prisma from "../../../../lib/prisma";

interface SettingsPageProps {}

async function getDetailCompany() {
  const session = await getServerSession(authOptions);

  const company = await prisma.company.findFirst({
    where: { id: session?.user.id },
    include: { CompanyOverview: true },
  });

  return company;
}

const SettingsPage: FC<SettingsPageProps> = async ({}) => {
  const company = await getDetailCompany();

  return (
    <div>
      <div className="font-semibold text-3xl mb-5"></div>
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="socialLinks">Social Links</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview detail={company?.CompanyOverview[0]} />
        </TabsContent>
        <TabsContent value="socialLinks">
          <SocialMediaForm />
        </TabsContent>
        <TabsContent value="teams">
          <TeamForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
