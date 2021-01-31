import React, { useEffect, useState, useContext } from "react";
import ResponsiveTable from "material-ui-next-responsive-table";

const MobileTable = (props) => {
  return <ResponsiveTable data={props.data} columns={props.columns} />;
};

export default MobileTable;
