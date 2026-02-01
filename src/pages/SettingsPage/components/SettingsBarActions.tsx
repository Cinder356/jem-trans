import useSettings from "@/app/hooks/useSettings";
import useLlmService from "@/app/hooks/useLlmService";
import AppBarActions from "@/components/AppBar/AppBarActions";
import { Button } from "@/components/ui/button";

export default function () {
  const { getProperty, isSaved, saveSettings } = useSettings();
  const { changeLlmService } = useLlmService();

  const handleSave = () => {
    saveSettings();
    changeLlmService(getProperty('llmService'));
  }

  return (
    <AppBarActions>
      <div className="grid items-center grid-cols-[1fr_auto_1fr]">
        <div />
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="flex justify-end">
          <Button className="font-bold rounded-xl" variant="outline" size="sm"
            disabled={isSaved} onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </AppBarActions>
  )
}
