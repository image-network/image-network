package image_network;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import org.json.JSONObject;

public class JSONParser {
	
	private String json;
	private String uid;
	private String imageId;
	
	private ArrayList<Pair<String, Double>> results;

	public JSONParser(String filename, String uid, String imageId) {
		this.uid = uid;
		this.imageId = imageId;
		this.results = new ArrayList<Pair<String, Double>>();
		
		BufferedReader br = null;
		String build = "";
		try {
			br = new BufferedReader(new FileReader(filename));
			String temp = br.readLine();
			while (temp != null) {
				build += temp;
				temp = br.readLine();
			}
			this.json = build;
			System.out.println("JSON: " + json);
		} catch (IOException ioe) {
			System.out.println("ioe [JSONParser]: " + ioe.getMessage());
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException ioe) {
					System.out.println("ioe [JSONParser]: " + ioe.getMessage());
				}
			}
		}
	}
	
	public void parse() {
		JSONObject obj = new JSONObject(json);
		JSONObject focus = obj.getJSONObject(uid + "|" + imageId);
		for (int i = 0; i < focus.names().length(); i++) {
			String first = focus.names().getString(i);
			Double second = focus.getDouble(focus.names().getString(i));
			Pair<String, Double> pair = new Pair<String, Double>(first, second);
			results.add(pair);
		}
	}
	
	public ArrayList<Pair<String, Double>> getResults() { return results; }
	
}
