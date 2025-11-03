import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import i18n from "../i18n";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      hello from home page
      <div className="p-4">
        test translate
        <h1>{t("welcome")}</h1>
        <Button
          className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded"
          onClick={() =>
            i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
          }
        >
          {t("click")}
        </Button>
      </div>
    </div>
  );
}
