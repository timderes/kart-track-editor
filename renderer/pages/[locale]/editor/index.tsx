import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import { useTranslation } from "next-i18next";
import OnlyControlsLayout from "@/components/layouts/OnlyControlsLayout";

const EditorPage = () => {
  const { t } = useTranslation();

  return <OnlyControlsLayout>{t("editor")}</OnlyControlsLayout>;
};

export default EditorPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };
