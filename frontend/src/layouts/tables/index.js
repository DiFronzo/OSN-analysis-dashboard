/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import { Author, Polarity, StandardText, GetAnalysis } from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

// Search context
import { useSearchContext } from "contexts/Search";

function Tables() {
  const [list, setList] = useState([]);
  const columns = [
    { name: "tweet", align: "left" },
    { name: "polarity", align: "left" },
    { name: "location", align: "left" },
    { name: "polarity_val", align: "center" },
    { name: "date", align: "center" },
    { name: "subjectivity", align: "center" },
  ]

  const { searchQuery } = useSearchContext();

  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSearch = async () => {
    setIsLoading(true);
    if (!searchQuery) {
      setSearchResults(null);
      setError(false);
      setIsLoading(false);
    }
    try {
			const data = await fetch(`http://127.0.0.1:5000/raw_data/${searchQuery}`);
			const json = await data.json();
			setSearchResults(json);
			setError(null);
		} catch (err) {
			setSearchResults(null);
			setError(err);
		}
		setIsLoading(false);
  }

  useEffect(handleSearch, []);
  
  //const { columns, rows } = authorsTableData;
  //const { columns: prCols, rows: prRows } = projectsTableData;

  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Download as CSV</MenuItem>
      <MenuItem onClick={closeMenu}>Download as JSON</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar handleSearch={handleSearch} />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>

            <VuiBox display="flex" justifyContent="space-between" alignItems="stretch" mb="22px">
              <VuiBox mb="auto">
                <VuiTypography variant="lg" color="white">
                  Raw Data Table {renderMenu}
                </VuiTypography>
              </VuiBox>

              <VuiBox display="flex" color="text" px={2}>
                <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
                  more_vert
                </Icon>
              </VuiBox>

            </VuiBox>
            <VuiBox
              alignItems="stretch"
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
              {list.length > 0 ? (<Table columns={columns} rows={list} /> ) : (<p>Loading...</p>) }
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
