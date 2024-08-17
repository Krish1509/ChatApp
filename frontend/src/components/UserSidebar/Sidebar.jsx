import SearchInput from './SearchInput';
import Conversations from './Conversations';

const Sidebar = ({ onSelectConversation }) => {
  return (
    <div className='w-full  border-r-[1px] border-slate-400 py-4 px-1 flex flex-col'>
      <SearchInput />
      <div className="border-b border-slate-400 my-4"></div> {/* Divider using Tailwind CSS */}
      <Conversations onSelectConversation={onSelectConversation} />
    </div>
  );
}

export default Sidebar;
