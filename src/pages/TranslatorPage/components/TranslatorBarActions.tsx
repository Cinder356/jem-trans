import { ArrowRightLeft } from "lucide-react";
import IconButton from "@/components/ui/IconButton/IconButton";
import AppBarActions from "@/components/AppBar/AppBarActions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { languagesByName, type LangCode } from '@/app/consts/languages';
import useTranslation from "../hooks/useTranslation";

const langOptions: [string, LangCode][] = Object.entries(languagesByName);

export default function () {
  const { langPair, updateLangPair } = useTranslation();

  return (
    <AppBarActions>
      <div className="flex gap-2 h-full items-center justify-center">

        <Select value={langPair.target} onValueChange={(newVal: LangCode) => updateLangPair({ target: newVal })}>
          <SelectTrigger size="sm" className="w-32 p-2 capitalize">
            <SelectValue placeholder="Choose language" />
          </SelectTrigger>
          <SelectContent position="popper">
            {langOptions.map(([langName, langCode]) =>
              <SelectItem key={langCode + '-target'} className="capitalize" value={langCode}>
                {langName}
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        <IconButton><ArrowRightLeft /></IconButton>

        <Select value={langPair.target} onValueChange={(newVal: LangCode) => updateLangPair({ target: newVal })}>
          <SelectTrigger size="sm" className="w-32 p-2 capitalize">
            <SelectValue placeholder="Choose language" />
          </SelectTrigger>
          <SelectContent position="popper">
            {langOptions.map(([langName, langCode]) =>
              <SelectItem key={langCode + '-target'} className="capitalize" value={langCode}>
                {langName}
              </SelectItem>
            )}
          </SelectContent>
        </Select>

      </div>
    </AppBarActions >
  )
}
