import Image from "next/image";
import pdfIcon from "./../../../../public/images/pictos/pdf.svg";
import docIcon from "./../../../../public/images/pictos/doc.svg";
import { ILocalFile } from "../../../lib/media";
import CommonLoader from "../CommonLoader/CommonLoader";
import { ApolloError } from "@apollo/client";
import "./common-media-card-thumbnail.scss";

interface ICommonCardThumbnailProps {
  media: ILocalFile;
  imageType: string;
  loading?: boolean | undefined;
  errors?: (ApolloError | undefined)[];
}

export default function CommonCommonMediaCardThumbnailThumbnail({
  media,
  imageType,
  loading,
  errors,
}: ICommonCardThumbnailProps) {
  return (
    <CommonLoader
      isLoading={loading ? loading : false}
      isShowingContent={loading}
      errors={errors}
    >
      {media.url && imageType === "image" ? (
        <div className="c-CommonMediaCardThumbnail__Image">
          <Image
            src={
              media.id ? `${media.url}?v=${new Date().getTime()}` : media.url
            }
            fill
            alt={media.alternativeText}
            priority={true}
          />
        </div>
      ) : media.mime.split("/")[1] === "pdf" ? (
        <div className="c-CommonMediaCardThumbnail__Doc">
          <Image src={pdfIcon} width={48} height={58} alt="" />
        </div>
      ) : (
        <div className="c-CommonMediaCardThumbnail__Doc">
          <Image src={docIcon} width={48} height={58} alt="" />
        </div>
      )}
    </CommonLoader>
  );
}
