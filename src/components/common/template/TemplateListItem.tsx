interface TemplateListItemProps {
  template: {
    templateId?: number;
    templateTitle: string;
    title: string;
    description: string;
    typeId: number;
    typeName?: string;
    firstCategoryName?: string;
    secondCategoryName?: string;
    managerId?: number;
    createdAt: string;
    updatedAt: string;
  };
  onClick: () => void;
}

export default function TemplateListItem({template, onClick}: TemplateListItemProps) {
  return (
    <li
      key={template.templateId}
      className="flex justify-between h-16 p-3 mb-4 border border-gray-2 bg-white hover:bg-gray-1 rounded cursor-pointer items-center whitespace-nowrap"
      onClick={onClick}
    >
      <div className="flex flex-col items-center w-48">
        <p className="font-bold text-xs"> {template.firstCategoryName}</p>
        <p className="font-regular text-[11px]">{template.secondCategoryName}</p>
      </div>
      <div className="flex flex-col items-start w-72">
        <p className="font-bold text-[13px]"> {template.templateTitle}</p>
        <p className="font-regular text-[11px]">{`[${template.typeName}] ${template.title}`}</p>
      </div>
      <div className="text-body-regular w-48">{template.createdAt}</div>
    </li>
  );
}
