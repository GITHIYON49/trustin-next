/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { Data } from "@/app/dashboard/samples/[id]/typings";
import { dateFormatter, getLaterDate } from "@/lib/utils";

// Create styles
const styles = StyleSheet.create({
  PDFContainer: {
    width: "100%",
    height: "50vh", //As per your page layout
    fontSize: "16px",
  },
  page: {
    // flexDirection: "row",
    backgroundColor: "white",
    fontSize: "10px",
    position: "relative",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  section: {
    margin: 10,
    marginTop: 0,
    padding: 10,
    flexGrow: 1,
    borderStyle: "solid",
    borderWidth: 1,
  },
  table: {
    display: "flex",
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "flex-start",
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCell: {
    fontSize: 10,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableHeader: {
    fontSize: 12,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
  },
  row: { flexDirection: "row", fontSize: "12px" },
  cell: {
    padding: 5,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderRightWidth: 1,
    borderRightColor: "#000000",
  },
  firstCell: { borderLeftWidth: 1, borderLeftColor: "#000000" },
  lastCell: { borderRightWidth: 1 },
  tableBody: { marginTop: 10, borderTopWidth: 1, borderTopColor: "#000000" },
});

// Create PDF component
const MyDocument = ({
  data,
  isDraft,
  qr,
  reportType = "Copy",
}: {
  data: Data;
  isDraft: boolean;
  qr: string;
  reportType: string;
}) => {
  console.log(data);
  console.log(qr);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          fixed
        >
          <Text
            style={{ fontSize: "10px", marginLeft: "10px", marginTop: "6px" }}
          >
            {data.sample.sample_id} {isDraft && "- Draft"}
          </Text>
          <Text
            style={{ fontSize: "10px", marginRight: "10px", marginTop: "6px" }}
          >
            {new Date().toLocaleString()}
          </Text>
        </View> */}
        <View style={styles.section}>
          <Header nabl_logo={data.sample.nabl_logo} />
          {/* <View>
            <Text>Invoice Number: 123456</Text>
            <Text>Date: January 1, 2024</Text>
          </View> */}
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
              fixed
            >
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 1,
                }}
              >
                Sample ID No.
              </Text>
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 2,
                  marginLeft: 4,
                }}
              >
                {data.sample.sample_id}
              </Text>

              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 100,
                  padding: 1,
                }}
              >
                ULR No.
              </Text>
              <Text style={{ padding: 2, marginLeft: 4 }}>
                {data.sample.ulr_no ?? "N/A"}
              </Text>
            </View>
            <View >

            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 1,
                }}
              >
                Sample Received Date
              </Text>
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 2,
                  marginLeft: 4,
                }}
              >
                {dateFormatter(data.sample.registration.date_of_received)}
              </Text>

              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 100,
                  padding: 1,
                }}
              >
                Discipline
              </Text>
              <Text style={{ padding: 2, marginLeft: 4 }}>
                {" "}
                {data.sample.disicipline ?? "N/A"}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 1,
                }}
              >
                Analysis Start Date
              </Text>
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 1,
                  marginLeft: 4,
                }}
              >
                {data.sample.sample_detail.length == 2
                  ? getLaterDate(
                      data.sample.sample_detail[0].testing_start_date,
                      data.sample.sample_detail[1].testing_start_date,
                    )
                  : dateFormatter(
                      data.sample.sample_detail[0].testing_start_date,
                    )}
              </Text>

              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 100,
                  padding: 1,
                }}
              >
                Group
              </Text>
              <Text style={{ padding: 2, marginLeft: 4 }}>
                {" "}
                {data.sample.group ?? "N/A"}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 1,
                }}
              >
                Analysis Completed Date
              </Text>
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 1,
                  marginLeft: 4,
                }}
              >
                {data.sample.sample_detail.length == 2
                  ? getLaterDate(
                      data.sample.sample_detail[0].testing_end_date,
                      data.sample.sample_detail[1].testing_end_date,
                    )
                  : dateFormatter(
                      data.sample.sample_detail[0].testing_end_date,
                    )}
              </Text>

              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 100,
                  padding: 1,
                }}
              >
                Test Report No.
              </Text>
              <Text style={{ padding: 2, marginLeft: 4 }}>
                {" "}
                {data.sample.report_no ?? "N/A"}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 1,
                }}
              >
                Report Date
              </Text>
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 1,
                  marginLeft: 4,
                }}
              >
                {dateFormatter(data.sample.updated_at)}
              </Text>

              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 100,
                  padding: 1,
                }}
              >
                Report Type.
              </Text>
              <Text style={{ padding: 2, marginLeft: 4 }}> {reportType}</Text>
            </View>

            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 1,
                }}
              >
                Customer Ref No.
              </Text>
              <Text style={{ padding: 1, marginLeft: 4 }}>
                {data.sample.registration.customer_reference_no ?? "---"}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 1,
                }}
              >
                Name of the customer
              </Text>
              <Text style={{ padding: 1, marginLeft: 4 }}>
                {data.sample.registration.company_name}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 1,
                }}
              >
                Address
              </Text>
              <Text style={{ padding: 1, width: "65%", marginLeft: 4 }}>
                {data.sample.registration.full_address}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 1,
                }}
              >
                Manufacturing License No.
              </Text>
              <Text style={{ padding: 1, marginLeft: 4 }}>
                {data.sample.registration.license_no ?? "---"}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 1,
                }}
              >
                Contact Person Name
              </Text>
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 1,
                  marginLeft: 4,
                }}
              >
                {data.sample.registration.contact_person_name}
              </Text>

              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 100,
                  padding: 1,
                }}
              >
                Contact Number
              </Text>
              <Text style={{ padding: 2, marginLeft: 4 }}>
                {data.sample.registration.contact_number}
              </Text>
            </View>
          </View>
          <View fixed>
            {/* <View style={{ marginTop: 5, border: "1 solid #000", padding: 2 }}>
              <Text>Customer Information</Text>
            </View> */}

            <View style={{ marginTop: 5, border: "1 solid #000", padding: 2 }} >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: "10px",
                  fontWeight: "extrabold",
                }}
              >
                Sample Details
              </Text>
            </View>
            
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{ borderRight: "1 solid #000", width: 140, padding: 2 }}
              >
                Sample Name
              </Text>
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 2,
                  marginLeft: 4,
                }}
              >
                {data.sample.sample_name}
              </Text>

              <Text
                style={{ borderRight: "1 solid #000", width: 100, padding: 2 }}
              >
                Test Method / Specification
              </Text>
              <Text style={{ padding: 2, marginLeft: 4 }}>
                {data.sample.sample_detail.length === 2
                  ? "Micro, Mech"
                  : data.sample.sample_detail[0].test_type_id === 1
                    ? "Micro"
                    : "Mech"}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{ borderRight: "1 solid #000", width: 140, padding: 2 }}
              >
                Batch No.
              </Text>
              <Text
                style={{
                  borderRight: "1 solid #000",
                  width: 140,
                  padding: 2,
                  marginLeft: 4,
                }}
              >
                {data.sample.batch_or_lot_no}
              </Text>
              <Text
                style={{ borderRight: "1 solid #000", width: 100, padding: 2 }}
              >
                Mfg Date
              </Text>
              <Text style={{ padding: 2, marginLeft: 4 }}>
                {data.sample.manufactured_date}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{ borderRight: "1 solid #000", width: 140, padding: 2 }}
              >
                Batch Size
              </Text>
              <Text
                style={{
                  padding: 2,
                  borderRight: "1 solid #000",
                  width: 140,
                  marginLeft: 4,
                }}
              >
                {data.sample.batch_size}
              </Text>

              <Text
                style={{ borderRight: "1 solid #000", width: 100, padding: 2 }}
              >
                Exp Date
              </Text>
              <Text style={{ padding: 2, marginLeft: 4 }}>
                {" "}
                {data.sample.expiry_date}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{ borderRight: "1 solid #000", width: 140, padding: 2 }}
              >
                Manufactured by
              </Text>
              <Text
                style={{
                  padding: 2,
                  borderRight: "1 solid #000",
                  width: 140,
                  marginLeft: 4,
                }}
              >
              {data.sample.registration.manufactured_by ?? "N/A" }  
              </Text>

              <Text
                style={{ borderRight: "1 solid #000", width: 100, padding: 2 }}
              >
                Sampled By
              </Text>
              <Text style={{ padding: 2, marginLeft: 4 }}> {data.sample.registration.sampled_by}</Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{ borderRight: "1 solid #000", width: 140, padding: 2 }}
              >
                Description
              </Text>
              <Text style={{ padding: 2, width: "65%", marginLeft: 4 }}>
                {data.sample.description}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{ borderRight: "1 solid #000", width: 140, padding: 2 }}
              >
                Quantity Received
              </Text>
              <Text style={{ padding: 2, marginLeft: 4 }}>
                {data.sample.received_quantity ?? "---"}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "10px",
                padding: 2,
              }}
            >
              <Text
                style={{ borderRight: "1 solid #000", width: 140, padding: 2 }}
              >
                Product Name
              </Text>
              <Text style={{ padding: 2, marginLeft: 4 }}>
                {data?.sample?.registration?.product_data?.product_name}
              </Text>
            </View>
            {/* <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "12px",
                padding: 2,
              }}
            >
              <Text
                style={{ borderRight: "1 solid #000", width: 180, padding: 2 }}
              >
                Product Code
              </Text>
              <Text style={{ padding: 2 }}>
                {data?.sample?.registration?.product_data?.product_code}
              </Text>
            </View>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                fontWeight: "bold",
                fontSize: "12px",
                padding: 2,
              }}
            >
              <Text
                style={{ borderRight: "1 solid #000", width: 180, padding: 2 }}
              >
                Date of Received
              </Text>
              <Text style={{ padding: 2 }}>
                {new Date(
                  data?.sample?.registration?.date_of_received,
                ).toLocaleDateString()}
              </Text>
            </View> */}
          </View>

          <View
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",
            }}
          ></View>
          <View>
            <View
              style={{ marginTop: 5, border: "1 solid #000", padding: 2 }}
              fixed
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 10,
                  fontWeight: "extrabold",
                }}
              >
                Test Result
              </Text>
            </View>

            <View
              style={[
                styles.row,
                styles.tableBody,
                { fontSize: "10px", textAlign: "center" },
              ]}
              fixed
            >
              <Text
                style={[
                  styles.cell,
                  styles.firstCell,
                  { width: "30%", fontSize: "10px" },
                ]}
              >
                Parameter Name
              </Text>
              {/* <Text style={[styles.cell, { width: "15%" }]}>Parameter Code</Text> */}
              <Text style={[styles.cell, { width: "25%" }]}>Method</Text>
              <View style={[styles.cell, { width: "35%" }]}>
                <Text style={{ paddingBottom: 1 }}>Specification Limits</Text>
                <View style={{ flexDirection: "row", textAlign: "center" }}>
                  <Text
                    style={{
                      width: "50%",
                      borderRightWidth: "1px",
                      borderRightColor: "#000",
                    }}
                  >
                    Min
                  </Text>
                  <Text style={{ width: "50%" }}>Max</Text>
                </View>
              </View>
              <Text style={[styles.cell, { width: "20%" }]}>Result Obtained</Text>
              <Text style={[styles.cell, styles.lastCell, { width: "15%" }]}>
                Status
              </Text>
            </View>
            {/* Table Body */}
            {data?.sample.sample_test_parameters.map((item, index) => (
              <View
                key={index}
                style={[styles.row, { fontSize: "10px" }]}
                break={
                  index === 2 || // Break after the 3rd item (index 2)
                  (index > 2 && (index - 3) % 6 === 0) // Break every 7 items after the first 3
                }
              >
                {/* <Text style={{ ...styles.cell, width: '25%' }}>{item.test_parameter.testing_parameters}</Text>
          <Text style={{ ...styles.cell, width: '15%' }}>{item.test_parameter.parameter_code}</Text>
          <Text style={{ ...styles.cell, width: '20%' }}>{item.test_parameter.method_or_spec}</Text>
          <Text style={{ ...styles.cell, width: '20%' }}>{item.value}</Text>
          <Text style={{ ...styles.cell, width: '20%' }}>{item.result ? "Pass" : "Fail"}</Text> */}

                <Text style={[styles.cell, styles.firstCell, { width: "30%" }]}>
                  {item.test_parameter.testing_parameters}
                </Text>
                {/* <Text style={[styles.cell, { width: "15%" }]}>
                {item.test_parameter.parameter_code}
              </Text> */}
                <Text style={[styles.cell, { width: "25%" }]}>
                  {item.test_parameter.method_or_spec}
                </Text>
                <View style={[styles.cell, { width: "35%" }]}>
                  {item.test_parameter.test_type_id === 1 ? (
                    <Text> {item.specification_limits} </Text>
                  ) : (
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          width: "50%",
                          borderRightWidth: "1px",
                          borderRightColor: "#000",
                        }}
                      >
                        {" "}
                        {item.min_limits}{" "}
                      </Text>
                      <Text
                        style={{
                          width: "50%",
                        }}
                      >
                        {" "}
                        {item.max_limits}{" "}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.cell, { width: "20%" }]}>
                  {item.value ?? "Pending"}
                </Text>
                <Text style={[styles.cell, styles.lastCell, { width: "15%" }]}>
                  {item.result ? "Pass" : "Fail"}
                </Text>
              </View>
            ))}
          </View>

          {/* <View style={{ marginTop: 5, padding: 2 }}>
            <View
              style={{
                border: "1 solid #000",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                fontWeight: "extrabold",
                fontSize: "14px",
                padding: 2
              }}
            >
              <Text style={{ borderRight: "1 solid #000" }}>
                Parameter Name
              </Text>
              <Text style={{ borderRight: "1 solid #000" }}>
                Parameter Code
              </Text>
              <Text style={{ borderRight: "1 solid #000" }}>Method</Text>
              <Text style={{ borderRight: "1 solid #000" }}>Value</Text>
              <Text>Result</Text>
            </View>
            {data?.sample.sample_test_parameters.map((item, index) => (
              <View
                key={index}
                style={{
                  border: "1 solid #000",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  fontWeight: "bold",
                  fontSize: "12px",
                  gap: 1,
                }}
              >
                <Text style={{ borderRight: "1 solid #000" }}>
                  {item.test_parameter.testing_parameters}
                </Text>
                <Text style={{ borderRight: "1 solid #000" }}>
                  {item.test_parameter.parameter_code}
                </Text>
                <Text style={{ borderRight: "1 solid #000" }}>
                  {item.test_parameter.method_or_spec}
                </Text>
                <Text style={{ borderRight: "1 solid #000" }}>
                  {item.value}
                </Text>
                <Text>{item.result ? "Pass" : "Fail"}</Text>
              </View>
            ))}
          </View> */}

          <Footer />
        </View>
      </Page>
      <Page>
        <View style={styles.section}>
          <Header nabl_logo={data.sample.nabl_logo} />
          <View
            style={{
              display: "flex",
              fontSize: 12,
              padding: 2,
              marginTop: "16px",
            }}
          >
            <Text style={{ fontWeight: "bold", textAlign: "left" }}>
              Statement of confirmity:
            </Text>
            <Text style={{ marginLeft: 20, textAlign: "left", fontSize: 10 }}>
              The Submitted sample passed as per abouve Test Method /
              Specifications with respect to the above test only.
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              fontSize: 10,
              padding: 2,
            }}
          >
            <Text
              style={{ fontWeight: "thin", textAlign: "left", fontSize: "7px" }}
            >
              <Text style={{ textDecoration: "underline", fontWeight: "bold" }}>
                Abbrevations:
              </Text>{" "}
              The Submitted sample passed as per abouve Test Method /
              Specifications with respect to the above test only.
            </Text>
          </View>

          <View
            style={{
              marginTop: 100,
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",
              fontSize: 14,
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row-reverse",
              }}
            >
              {data.sample.sample_detail.map((detail) => (
                <View
                  key={detail.id}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Text style={{ fontWeight: "bold", textAlign: "right", marginBottom:"8px" }}>
                    Authorized Signatory{" "}
                  </Text>
                  <Text style={{ fontWeight: "bold", textAlign: "center", marginBottom:"8px" }}>
                    {detail.authorized_sign
                      ? `${detail.authorized_sign.first_name} ${detail.authorized_sign.last_name}`
                      : ""}
                  </Text>
                  <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                    {detail.authorized_sign
                      ? `${detail.authorized_sign.designation ?? ""} `
                      : ""}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              marginTop: 150,
              display: "flex",
              flexDirection: "column",
              fontSize: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "left",
                paddingVertical: 2,
              }}
            >
              Note : 1. No external service provider used in this report
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "left",
                textIndent: 30,
                paddingVertical: 2,
              }}
            >
              2. No additions, deviations or exclusions from the tesrmethod.
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                paddingVertical: 2,
              }}
            >
              {" "}
              * This test report shall not be reproduced except in full, without
              written approval of the laboratory. *
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                paddingVertical: 2,
              }}
            >
              * The test results in this report refer only to the sample tested
              in the laboratory and the sample submitted by the party. *
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                paddingVertical: 2,
              }}
            >
              NABL Accredited Laboratory vide cert. No: TC-5410 valid upto
              30/03/2026, CDSCO Registration No: TLIMD/2020/000002
            </Text>
            {isDraft && (
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                * This is Draft report, you can&apos;t use this for
                certification purpose. *
              </Text>
            )}
          </View>
          <View style={{ height: "200px" }}>
            <Image src={qr} style={{ width: 100, height: 100 }} />
          </View>
          <Footer />
        </View>
      </Page>
    </Document>
  );
};

const Header = ({ nabl_logo }: { nabl_logo: boolean }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #000",
      }}
      fixed
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        {nabl_logo && (
          <Image
            src="/images/pdf/nabl_logo.png"
            style={{ width: 150, height: 80 }}
          />
        )}
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: "auto ",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "12px",
            marginTop: "5px",
          }}
        >
          Test Report
        </Text>
      </View>

      <View>
        <Image src="/images/logo/logo.png" style={{ width: 100, height: 50 }} />
      </View>
    </View>
  );
};

const Footer = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 5,
        left: 0,
        right: 0,
        padding: 2,
      }}
      fixed
    >
      <View style={{ display: "flex", marginBottom: "7px" }}>
        <View style={{ border: "1 solid #000" }}></View>
        <View style={{ border: "1 solid #000" }}></View>
        <View style={{ textAlign: "center", padding: 1 }}>
          <Text
            style={{
              fontSize: "17px",
              fontWeight: "ultrabold",
              padding: 2,
            }}
          >
            Trustin Analytical Solutions Private Limited
          </Text>
          <Text style={{ fontSize: "12px", fontWeight: "thin", padding: 2 }}>
            {" "}
            (An ISO 17025:2017 Accredited / CDSCO & BIS APProved Testing
            Laboratory)
          </Text>
          <Text style={{ fontSize: "12px", fontWeight: "medium", padding: 2 }}>
            {" "}
            R.K Complex First Floor, Plot No.303/B, B-Block, Thiruneermalai
            Road,
          </Text>
          <Text style={{ fontSize: "12px", fontWeight: "medium", padding: 2 }}>
            {" "}
            Parvathy Puram, Chrompet, Chennai-600044, Tamilnadu, India.
          </Text>
          <Text style={{ fontSize: "12px", fontWeight: "medium", padding: 2 }}>
            Ph: 044-22731006, Email: customercare@trustingroup.in,
            web:www.trustingroup.in
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MyDocument;
