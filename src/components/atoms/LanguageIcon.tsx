import { LanguageType } from "@/types/constants";
import JavaOriginalIcon from "react-devicons/java/original";
import JavascriptOriginalIcon from "react-devicons/javascript/original";
import PythonOriginalIcon from "react-devicons/python/original";
import XmlOriginalIcon from "react-devicons/xml/original";
import RubyOriginalIcon from "react-devicons/ruby/original";
import MarkdownOriginalIcon from "react-devicons/markdown/original";
import JsonOriginalIcon from "react-devicons/json/original";
import HandlebarsOriginalIcon from "react-devicons/handlebars/original";
import CsharpOriginalIcon from "react-devicons/csharp/original";
import ElixirOriginalIcon from "react-devicons/elixir/original";
import TypescriptOriginalIcon from "react-devicons/typescript/original";
import Css3OriginalIcon from "react-devicons/css3/original";

export default function LanguageIcon({ language }: { language: LanguageType }) {
  return (
    <>
      {language === "java" && <JavaOriginalIcon size="15px" />}
      {language === "javascript" && <JavascriptOriginalIcon size="15px" />}
      {language === "python" && <PythonOriginalIcon size="15px" />}
      {language === "xml" && <XmlOriginalIcon size="15px" />}
      {language === "ruby" && <RubyOriginalIcon size="15px" />}
      {language === "markdown" && <MarkdownOriginalIcon size="15px" />}
      {language === "json" && <JsonOriginalIcon size="15px" />}
      {language === "handlebars" && <HandlebarsOriginalIcon size="15px" />}
      {language === "csharp" && <CsharpOriginalIcon size="15px" />}
      {language === "elixir" && <ElixirOriginalIcon size="15px" />}
      {language === "typescript" && <TypescriptOriginalIcon size="15px" />}
      {language === "css" && <Css3OriginalIcon size="15px" />}
    </>
  );
}
