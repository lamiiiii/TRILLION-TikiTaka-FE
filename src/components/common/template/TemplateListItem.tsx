interface TemplateListItemProps {
  template: {
    id: number;
    name: string;
    firstCategory?: string;
    secondCategory?: string;
    manager?: string;
    type?: string;
    title?: string;
    content?: string;
    createdAt: string;
  };
  onClick: () => void;
}

export default function TemplateListItem({template, onClick}: TemplateListItemProps) {
  return (
    <li
      key={template.id}
      className="flex justify-between h-16 p-3 mb-4 border border-gray-2 bg-white hover:bg-gray-1 rounded cursor-pointer whitespace-nowrap"
      onClick={onClick}
    >
      <div className="flex flex-col items-center w-32">
        <p className="text-subtitle-regular"> {template.firstCategory}</p>
        <p className="text-body-regular">{template.secondCategory}</p>
      </div>
      <div className="flex flex-col items-start w-72">
        <p className="text-subtitle-regular"> {template.name}</p>
        <p className="text-body-regular">{`[${template.type}] ${template.title}`}</p>
      </div>
      <div className="text-body-regular w-32">{template.createdAt}</div>
    </li>
  );
}
