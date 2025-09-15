import BasicModal from "../../shared/BasicModal";
import Table from "../../shared/Table/Table";
import EditForm from "./EditForm";
import renderRow from "./renderRow";

const GPixelAndGTMRoot = ({
  label,
  columns,
  data,
  currentItem,
  isModalOpen,
  openEditModal,
  closeEditModal,
}) => {
  return (
    <div className="space-y-2 md:space-y-4 lg:space-y-6 mx-2 md:mx-3 lg:mx-4">
      <h2 className="text-lg md:text-xl font-medium">{label} Manager</h2>

      <div className="px-2 md:px-4 lg:px-6 space-y-2 md:space-y-4 lg:space-y-6">
        <Table
          columns={columns}
          data={data}
          renderRow={renderRow}
          additionalProps={{
            label: label,
            onEdit: openEditModal,
          }}
        />
      </div>

      {/* edit modal */}
      {!!currentItem && (
        <BasicModal isModalOpen={isModalOpen} onClose={closeEditModal}>
          <EditForm label={label} details={currentItem} />
        </BasicModal>
      )}
    </div>
  );
};

export default GPixelAndGTMRoot;
