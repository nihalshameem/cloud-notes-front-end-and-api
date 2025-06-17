'use client';

import React, { FC } from 'react';
import { PencilLine } from 'lucide-react';

type Props = {
    title?: string;
    update: (title: string) => void;
};

{/* <PencilLine /> */ }
const TitleEditor: FC<Props> = ({ title, update }) => {


    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [titleValue, setTitleValue] = React.useState<string>(title || '');

    React.useEffect(() => {
        setTitleValue(title || '');
    }
        , [title]);

    return (
        <>
            {editMode ?
                <input
                    type="text"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter note title..."
                    autoFocus
                    onBlur={() => setEditMode(false)}
                    value={titleValue}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setEditMode(false);
                            update(titleValue);
                        }
                    }}
                    onChange={(e) => {
                        setTitleValue(e.target.value);
                    }}
                />
                :
                <h2
                    className="text-xl font-semibold mb-4 cursor-pointer flex items-center justify-between"
                    onClick={() => setEditMode(true)}
                >
                    <span>{!titleValue ? 'Untitled Note' : titleValue}</span>
                    <PencilLine className="ml-2 w-5 h-5 text-gray-500" />
                </h2>
            }
        </>
    );
};

export default TitleEditor;
