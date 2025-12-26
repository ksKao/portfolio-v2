import { Select } from "@base-ui/react/select";
import type { getDirectusLanguages } from "@lib/directus";
import { motion } from "motion/react";
import { useState } from "react";

export default function LanguageDropdown({
  currentLocale,
  languages,
}: {
  currentLocale: string;
  languages: Awaited<ReturnType<typeof getDirectusLanguages>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Select.Root
      value={currentLocale}
      onValueChange={(val) => {
        if (val !== currentLocale) {
          if (val === "en-US") {
            window.location.href = "/";
          } else {
            window.location.href = `/${val}`;
          }
        }
      }}
      open={open}
      onOpenChange={setOpen}
      items={languages.map((lang) => ({
        label: lang.name,
        value: lang.code,
      }))}
    >
      <Select.Trigger className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xs md:text-base">
        <Select.Value className="text-lg">
          {languages.find((l) => l.code === currentLocale)?.emoji}
        </Select.Value>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup
            render={
              <motion.div
                className="bg-card absolute top-full right-0 w-fit translate-x-4 translate-y-2 rounded-md p-2"
                initial={false}
                animate={{
                  opacity: open ? 1 : 0,
                  scale: open ? 1 : 0.8,
                }}
              />
            }
          >
            <Select.ScrollUpArrow />
            <Select.List>
              {languages.map(({ code, name, emoji }) => (
                <Select.Item
                  key={code}
                  value={code}
                  className="data-highlighted:bg-highlighted cursor-pointer rounded-md p-2"
                >
                  <Select.ItemText className="flex items-center justify-between gap-2">
                    <span>{emoji}</span>
                    <span className="whitespace-nowrap">{name}</span>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
            <Select.ScrollDownArrow />
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
