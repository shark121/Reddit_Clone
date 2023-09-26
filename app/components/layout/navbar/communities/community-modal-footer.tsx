import { Button } from "@/app/components/ui/button";
import { ModalFooter } from "@nextui-org/react";

const CommunityModalFooter = () => {
  return (
    <ModalFooter className="p-0">
      <div className="w-full px-2 py-3 bg-blue-100 dark:bg-gray-300 flex gap-2 justify-end">
        <Button className="text-primary bg-transparent">Close</Button>
        <Button className="bg-primary text-primary-foreground">
          Create Community
        </Button>
      </div>
    </ModalFooter>
  );
};

export default CommunityModalFooter;
