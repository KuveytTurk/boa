import * as React from 'react';
import { ComponentBase, ComponentBaseProps } from '@kuveytturk/boa-base';

export interface BIconProp extends ComponentBaseProps {
  style?: React.CSSProperties;
  nativeColor?: string;
}

export class IconBase extends ComponentBase<BIconProp> {
  context: any;
}

export const Icon: {
  getIcon(cmpProps: any): any;
};

export default Icon;

export class Add extends IconBase {}
export class ArrowDownward extends IconBase {}
export class ArrowLeft extends IconBase {}
export class ArrowRight extends IconBase {}
export class ArrowUpward extends IconBase {}
export class Attachment extends IconBase {}
export class Chat extends IconBase {}
export class ContentCopy extends IconBase {}
export class Create extends IconBase {}
export class Delete extends IconBase {}
export class DoNotDisturbAlt extends IconBase {}
export class DocumentAdd extends IconBase {}
export class DocumentRemove extends IconBase {}
export class DocumentTextGraph extends IconBase {}
export class Document extends IconBase {}
export class Done extends IconBase {}
export class DoubleChevronRight extends IconBase {}
export class FileDownload extends IconBase {}
export class FileUpload extends IconBase {}
export class FindInPage extends IconBase {}
export class Folder extends IconBase {}
export class InfoCircle extends IconBase {}
export class List extends IconBase {}
export class LockOpen extends IconBase {}
export class MailOutline extends IconBase {}
export class Map extends IconBase {}
export class None extends IconBase {}
export class PauseCircleFilled extends IconBase {}
export class Pin extends IconBase {}
export class PlayCircleFilled extends IconBase {}
export class Print extends IconBase {}
export class Redo extends IconBase {}
export class Refresh extends IconBase {}
export class RemoveCircle extends IconBase {}
export class Remove extends IconBase {}
export class Save extends IconBase {}
export class Search extends IconBase {}
export class SelectAll extends IconBase {}
export class SettingsBackupRestore extends IconBase {}
export class StopCircleFilled extends IconBase {}
export class Undo extends IconBase {}
export class KTBTLogo extends IconBase {}
export class BOALogo extends IconBase {}
export class KTLogoOnlyOriginal extends IconBase {}
export class KTLogoWhite extends IconBase {}
export class KFHLogo extends IconBase {}
export class KFHLogoWhite extends IconBase {}
export class Accessibility extends IconBase {}
export class AccountBalance extends IconBase {}
export class AccountCircle extends IconBase {}
export class Banknote extends IconBase {}
export class BusinessCenter extends IconBase {}
export class Customer360 extends IconBase {}
export class Dashboard extends IconBase {}
export class DeviceHub extends IconBase {}
export class DevicesOther extends IconBase {}
export class Exposure extends IconBase {}
export class FeatherPen extends IconBase {}
export class HeadsetMic extends IconBase {}
export class Home extends IconBase {}
export class InsertChart extends IconBase {}
export class Language extends IconBase {}
export class LocationCity extends IconBase {}
export class Public extends IconBase {}
export class ShoppingCart extends IconBase {}
export class Toll extends IconBase {}
export class TrackChanges extends IconBase {}
export class Umbrella extends IconBase {}
export class VerifiedUse extends IconBase {}
export class ChevronLeft extends IconBase {}
export class ChevronRight extends IconBase {}
export class Criterias extends IconBase {}
export class Lock extends IconBase {}
export class Resizable extends IconBase {}
export class User extends IconBase {}
export class AcrobatLogo extends IconBase {}
export class ImageLogo extends IconBase {}
export class MailLogo extends IconBase {}
export class OtherLogo extends IconBase {}
export class ExcelLogo extends IconBase {}
