import { Select } from "@base-ui/react/select";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const languages = [
  { label: "English", value: "en-US", emoji: "🇺🇸" },
  { label: "简体中文", value: "zh-CN", emoji: "🇨🇳" },
];

export default function LanguageDropdown() {
  const [value, setValue] = useState("en-US");
  const [open, setOpen] = useState(false);

  return (
    <Select.Root
      value={value}
      onValueChange={(val) => setValue(val ?? "en-US")}
      open={open}
      onOpenChange={setOpen}
      items={languages}
    >
      <Select.Trigger className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xs md:text-base">
        <Select.Value className="text-lg">
          {languages.find((l) => l.value === value)?.emoji}
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
              {languages.map(({ label, value, emoji }) => (
                <Select.Item
                  key={label}
                  value={value}
                  className="data-highlighted:bg-highlighted cursor-pointer rounded-md p-2"
                >
                  <Select.ItemText className="flex items-center justify-between gap-2">
                    <span>{emoji}</span>
                    <span className="whitespace-nowrap">{label}</span>
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
